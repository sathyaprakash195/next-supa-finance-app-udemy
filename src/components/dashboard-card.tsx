import React from "react";

interface DashboardCardProps {
  title: string;
  value: number;
  description: string;
}

function DashboardCard({ title, value, description }: DashboardCardProps) {
  return (
    <div className="p-5 border border-gray-400 flex flex-col gap-2">
      <h1 className="text-sm uppercase font-bold">{title}</h1>
      <h1 className="text-5xl font-bold">$ {value}</h1>
      <p className="text-xs text-gray-600">{description}</p>
    </div>
  );
}

export default DashboardCard;
