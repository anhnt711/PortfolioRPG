export default function InventoryBar({ items=[] }) {
  return (
    <div className="flex gap-3">
      {items.map(it => (
        <a key={it.id} href={it.url || "#"} target="_blank" className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center hover:scale-105 transition">
          <img src={it.icon} alt={it.label} className="w-6 h-6" />
        </a>
      ))}
    </div>
  );
}
