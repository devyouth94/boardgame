import { Toaster as RawToaster } from "sonner";

const ToasterProvider = () => {
  return <RawToaster richColors position="bottom-center" duration={2000} />;
};

export default ToasterProvider;
