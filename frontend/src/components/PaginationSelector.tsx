import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
  restaurantCount: number;
};

const PaginationSelector = ({
  page,
  pages,
  onPageChange,
  restaurantCount,
}: Props) => {
  const pageNumber = [];
  for (let i = 1; i <= pages; i++) {
    pageNumber.push(i);
  }

  return (
    <Pagination>
      <PaginationContent>
        {page !== 1 && (
          <PaginationItem>
            <PaginationPrevious
              href=""
              onClick={() => onPageChange(page - 1)}
            />
          </PaginationItem>
        )}
        {pageNumber.map((currentPage, i) => (
          <PaginationItem key={`pageNo=${i}`}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(currentPage)}
              isActive={page === currentPage}
            >
              {currentPage}{" "}
            </PaginationLink>
          </PaginationItem>
        ))}
        {page !== pageNumber.length && restaurantCount > 0 && (
          <PaginationNext href="#" onClick={() => onPageChange(page + 1)} />
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationSelector;
