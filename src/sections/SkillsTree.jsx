function Node({ n, depth=0 }) {
  return (
    <div className="ml-4">
      <div className="inline-block bg-neutral-800 rounded-xl px-3 py-1 my-1 text-sm">{n.name}</div>
      {n.children?.length ? (
        <div className="border-l border-neutral-700 ml-3 pl-3">
          {n.children.map((c,i)=><Node key={i} n={c} depth={depth+1} />)}
        </div>
      ) : null}
    </div>
  );
}
export default function SkillsTree({ tree }) {
  return <div>{tree.map((n,i)=><Node key={i} n={n} />)}</div>;
}
