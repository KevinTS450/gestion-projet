import { Button } from "antd";

export const Pagination = ({ currentPage, totalPages, onPageChange ,changePage }) => {

    console.log(currentPage)
    console.log(totalPages)
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
            changePage(currentPage - 1)
        }
    };

    const handleNext = () => {

        if (currentPage < totalPages) {

            onPageChange(currentPage + 1);
            changePage(currentPage + 1)

        }
    };

    return (
        <div>
            <Button onClick={handlePrevious} disabled={currentPage === 1}>
                Previous
            </Button>
            <span> Page {currentPage} of {totalPages} </span>
            <Button onClick={handleNext} disabled={currentPage === totalPages || totalPages===0}>
                Next
            </Button>
        </div>
    );
};