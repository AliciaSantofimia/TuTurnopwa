import React from "react";

const toISODate = (d) => d.toISOString().slice(0, 10);

const todayISO = toISODate(new Date());

const maxISO = (() => {
  const d = new Date();
  d.setFullYear(d.getFullYear() + 2);
  return toISODate(d);
})();

export default function DateInputReserva({ id = "fecha", value, onChange }) {
  return (
    <input
      type="date"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      min={todayISO}
      max={maxISO}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-base"
      required
    />
  );
}