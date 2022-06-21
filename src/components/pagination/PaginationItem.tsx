import { Button } from "@chakra-ui/react";

type PaginationProps = {
  isCurrent?: boolean;
  number: number;
  onPageChange: (page: number) => void;
};

export function PaginationItem({
  isCurrent = false,
  number,
  onPageChange,
}: PaginationProps) {
  if (isCurrent) {
    return (
      <Button
        data-testid="pagination-item"
        size="sm"
        fontSize="xs"
        w="4"
        disabled
        _disabled={{
          bgColor: "pink.500",
          cursor: "default",
        }}
        colorScheme="pink"
      >
        {number}
      </Button>
    );
  }

  return (
    <Button
      size="sm"
      fontSize="xs"
      w="4"
      bg="gray.700"
      color="white"
      _hover={{
        bgColor: "gray.500",
      }}
      onClick={() => onPageChange(number)}
    >
      {number}
    </Button>
  );
}
