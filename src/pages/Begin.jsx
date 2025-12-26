import QuestHub from "@sections/QuestHub";

export default function Begin({ onNavigate }) {
  return (
    <div className="fixed inset-0 z-50">
      <QuestHub onNavigate={onNavigate} />
    </div>
  );
}
