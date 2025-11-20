"use client";

interface ServiceCardProps {id: number;img: string;label: string;onClick?: (service: any) => void;}
// Add different bg colors for each card
const bgColors = [
  "bg-[#47567B]",
  "bg-[#8A2BE2]",
  "bg-[#1ABC9C]",
  "bg-[#E74C3C]",
  "bg-[#2E6BF5]",
  "bg-[#F5A623]",
];

export default function ServiceCard({ id, img, label, onClick }: ServiceCardProps) {
  return (
    <div onClick={() => onClick && onClick({ id, img, label })}className="cursor-pointer flex flex-col items-center  shadow-sm hover:shadow-md p-4 rounded-xl transition">
      <div className={`w-20 h-20 flex items-center justify-center rounded-xl shadow-md ${bgColors[id - 1]}`}>
        <img src={img} alt={label} className="w-10 h-10 object-none" />
      </div>
      <p className="mt-2 text-base font-medium">{label}</p>
    </div>
  );
}
