function Badge({ text }) {
  const styles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
    Pending: "bg-gray-200 text-gray-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-200 text-green-800",
  };

  return (
    <span
      className={`px-2 py-1 text-xs rounded-full font-medium ${styles[text]}`}
    >
      {text}
    </span>
  );
}

export default Badge;
