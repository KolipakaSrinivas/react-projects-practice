export default function PaginationBar({
  handlePageChange,
  handleNextPage,
  handlePrevPage,
  totalPages,
  currentPage,
}) {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Paganation</h1>
      <div className="paganation-bar">
        <button disabled={currentPage == 0} onClick={handlePrevPage}>
          ⬅️
        </button>
        {[...Array(totalPages).keys()].map((num) => {
          return (
            <span
              key={num}
              onClick={() => handlePageChange(num)}
              className={`${currentPage == num ? "active-page" : ""}`}
            >
              {num}
            </span>
          );
        })}
        <button
          disabled={currentPage == totalPages - 1}
          onClick={handleNextPage}
        >
          ➡️
        </button>
      </div>
    </div>
  );
}
