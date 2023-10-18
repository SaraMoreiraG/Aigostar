// Function to scroll to a specific section on the page
export const scrollToSection = (sectionId) => {
	const targetSection = document.getElementById(sectionId);
	if (targetSection) {
	  targetSection.scrollIntoView({ behavior: "smooth" });
	}
  };
