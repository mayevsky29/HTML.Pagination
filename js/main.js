const pages = document.querySelectorAll(".page-content .page");
const pageNumbersContainer = document.querySelector(".page-numbers-container");

if (pageNumbersContainer) {

	let pn = localStorage.getItem("pageNumber") ? localStorage.getItem("pageNumber") : 0;

	const createPagination = () => {
	    pages.forEach((p, i) => {
	        const pageNumber = document.createElement("div");
	        pageNumber.classList.add("page-number");
	        pageNumber.textContent = i + 1;
	        pageNumber.addEventListener("click", () => {
				localStorage.setItem("pageNumber", i);
				location.reload();
	        })

	        pageNumbersContainer.appendChild(pageNumber);
	    })

	    document.querySelector(".page-number").classList.add("active");
	    pages[0].classList.add("active");
	}

	createPagination();

	const pageNumbers = document.querySelectorAll(".page-numbers-container .page-number");

	const activatePage = (pageNumber) => {
	    pages.forEach(p => {
	        p.classList.remove("active");
	    })

	    pages[pageNumber].classList.add("active");

	    pageNumbers.forEach(p => {
	        p.classList.remove("active");
	    })

	    pageNumbers[pageNumber].classList.add("active");

		localStorage.removeItem("pageNumber");
		history.scrollRestoration = "manual";
	}

	activatePage(pn);
	
}