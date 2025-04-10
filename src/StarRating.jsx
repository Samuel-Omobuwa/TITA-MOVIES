const starContainerSyle = {
  display: "flex",
  gap: "4px",
};

const textStyle = {
  display: "flex",
  margin: "0",
};

export default function StarRating({ maxRating = 5 }) {
  return (
    <div style={starContainerSyle}>
      <div style={textStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <span>S {i + 1}</span>
        ))}
      </div>
    </div>
  );
}
