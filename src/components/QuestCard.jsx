export default function QuestCard({ q }) {
  return (
    <div className="bg-neutral-900 rounded-2xl p-4">
      <div className="border-2 border-dashed border-neutral-700 rounded-xl text-center py-2 text-sm mb-3">Thumbnail</div>
      <h3 className="font-semibold">{q.title}</h3>
      <p className="text-sm text-neutral-400 mt-1">{q.summary}</p>
    </div>
  );
}
