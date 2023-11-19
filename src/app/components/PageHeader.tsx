interface PageHeaderProps {
  heading: string;
  text?: string;
}

export default function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className="w-full text-center md:text-left">
      {text && <span className="text-[#0245A3] font-bold">{text}</span>}
      <h2 className="text-2xl mt-2 font-bold font-heading">
        {heading}
      </h2>
    </div>
  );
}
