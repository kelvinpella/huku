type Props = {
  children: React.ReactNode;
  statusText: string;
};

export default function JobApplicationStatusElement({
  children,
  statusText,
}: Props) {
  return (
    <div className="flex items-center gap-1 flex-nowrap">
      <span>{children}</span>
      <span className="text-sm">{statusText}</span>
    </div>
  );
}
