import Timer from "./Timer";

export default function Page() {
  return (
    <main style={{ display: "flex", justifyContent: "center", padding: "3rem" }}>
      <div>
        <h1 style={{ marginBottom: "1rem" }}>Timer</h1>
        <Timer initialSeconds={25 * 60} />
      </div>
    </main>
  );
}
