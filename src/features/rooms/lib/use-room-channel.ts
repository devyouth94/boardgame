import type { RealtimeChannel } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import { useGetUserInfo } from "~/entities/auth/service/auth.query";
import { PlayerInfo } from "~/entities/players/model/players.schema";
import { usePlayerActions } from "~/entities/players/model/players.store";

import { supabase } from "~/shared/api/supabase";

const useRoomChannel = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const { data: userInfo } = useGetUserInfo();

  const { onChangePlayerMap } = usePlayerActions();

  const channelRef = useRef<RealtimeChannel>();

  useEffect(() => {
    if (!roomId) return;

    let channel = channelRef.current;
    channel = supabase.channel(`room:${roomId}`);

    channel
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "players", filter: `room_id=eq.${roomId}` },
        (payload) => {
          const userId = userInfo?.id;
          const { old: oldRecord, new: newRecord } = payload;

          // 방 삭제 관련 변경사항
          const isMine = userId === newRecord.id;
          const isRoomDelete = newRecord.entered_at === null && newRecord.left_at === null;

          if (isMine && isRoomDelete) {
            navigate("/main", { replace: true });
            toast.error("방장이 방을 삭제했어요");
            return;
          }

          if (!isMine && isRoomDelete) return;

          // 플레이어 준비 상태 관련 변경사항
          const isChangeReady = oldRecord.ready_status !== newRecord.ready_status;

          if (isChangeReady) {
            onChangePlayerMap((prev) => {
              const newMap = new Map(prev);
              const instance = newMap.get(newRecord.id);
              if (instance) {
                newMap.set(instance.id, { ...instance, ready_status: newRecord.ready_status });
              }
              return newMap;
            });
          }

          // 플레이어 출입 상태 관련 변경사항
          const isEntered = oldRecord.entered_at === null && newRecord.entered_at;
          const isLeft = oldRecord.entered_at && newRecord.entered_at === null;

          if (isEntered) {
            onChangePlayerMap((prev) => {
              const newMap = new Map(prev);
              newMap.set(newRecord.id, newRecord as PlayerInfo);
              return newMap;
            });
            toast.message(`${newRecord.name}님이 들어왔어요`);
            return;
          }

          if (isLeft) {
            onChangePlayerMap((prev) => {
              const newMap = new Map(prev);
              newMap.delete(newRecord.id);
              return newMap;
            });
            toast.message(`${newRecord.name}님이 나갔어요`);
            return;
          }
        },
      )
      .subscribe();

    return () => {
      channel?.unsubscribe();
    };
  }, [roomId]);

  return { channelRef };
};

export default useRoomChannel;
