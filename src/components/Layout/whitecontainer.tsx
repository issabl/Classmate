export default function WhiteContainer({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        bg-white
        rounded-[30px]
        m-3
        p-[8px]
        w-[9000px]
        h-[685px]
        shadow-[0px_8px_30px_rgba(0,0,0,0.08)]
        shadow-inner
      "
    >
      {children}
    </div>
  );
}
