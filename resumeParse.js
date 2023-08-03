const fs = require('fs').promises; // Use fs.promises for async file operations
const PDFParser = require('pdf-parse'); // Import pdf-parse library
let resumeInfo = new Set(); 
// Replace 'input.pdf' with the path to your PDF file
const pdfFilePath = './HDunkley-Resume.pdf';

// Read the PDF file using async/await
async function resumeParse(pdfFilePath) {
  try {  
    const pdfBuffer = await fs.readFile(pdfFilePath);

    // Parse the PDF using pdf-parse
    const pdfData = await PDFParser(pdfBuffer);

    // Extracting the text content from the parsed PDF data
    const resumeText = pdfData.text;

    // Initialize variables to store different sections
    let skills = '';
    let education = '';
    let workExperience = '';

    // Custom logic to extract different sections based on patterns
    // Replace the patterns and section names as per your requirement
    const lines = resumeText.split('\n');
    let currentSection = '';
    lines.forEach(line => {
      if (line.includes('skills') || line.includes('Skills') || line.includes("SKILLS")) {
        currentSection = 'skills';
      } else if (line.includes('Education') || line.includes('EDUCATION')) {
        currentSection = 'education';
      } else if (line.includes('Work') || line.includes('WORK') ||  line.includes('Experience')) {
        currentSection = 'workExperience';
      } else {
        // Append the content based on the current section
        switch (currentSection) {
          case 'skills':
            skills += line + ' ';
            break;
          case 'education':
            education += line + ' ';
            break;
          case 'workExperience':
            workExperience += line + ' ';
            break;
          default:
            // Do nothing if no recognized section found
            break;
        }
      }
    });
    // Print the extracted sections
    // console.log('skills:', skills.trim());
    // console.log('Education:', education.trim());
    // console.log('Work Experience:', workExperience.trim());
    const yourInfo = {skills, education, workExperience}; 
    resumeInfo.add(yourInfo); 
    // console.log(resumeInfo); 
    return resumeInfo; 
  } catch (error) { 
    console.error('Error reading the PDF file:', error);
  }
};
resumeParse(pdfFilePath); 

module.exports = resumeParse; 
