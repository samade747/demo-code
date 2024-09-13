// Get form elements
const resumeForm = document.getElementById('resumeForm');
const resumeOutput = document.getElementById('resumeOutput');

const outputName = document.getElementById('outputName');
const outputEmail = document.getElementById('outputEmail');
const outputPhone = document.getElementById('outputPhone');
const outputEducation = document.getElementById('outputEducation');
const outputExperience = document.getElementById('outputExperience');
const outputSkills = document.getElementById('outputSkills');

const downloadBtn = document.getElementById('download-btn');
const shareLinkContainer = document.getElementById('share-link-container');
const shareLink = document.getElementById('share-link');
const copyBtn = document.getElementById('copy-btn');

// Event listener for form submission
resumeForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Fetch form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const education = document.getElementById('education').value;
  const experience = document.getElementById('experience').value;
  const skills = document.getElementById('skills').value;

  // Display resume with form values
  outputName.textContent = name;
  outputEmail.textContent = email;
  outputPhone.textContent = phone;
  outputEducation.textContent = education;
  outputExperience.textContent = experience;
  outputSkills.textContent = skills;

  // Show the resume section and the download button
  resumeOutput.style.display = 'block';

  // Generate a unique shareable link (based on name for simplicity)
  const baseURL = window.location.href.split('?')[0]; // Get the base URL
  const uniqueLink = `${baseURL}?username=${encodeURIComponent(name)}`;
  shareLink.href = uniqueLink;
  shareLink.textContent = uniqueLink;
  shareLinkContainer.style.display = 'block';
});

// Enable editing functionality
const editButton = document.getElementById('edit-btn');
const editableFields = [outputName, outputEmail, outputPhone, outputEducation, outputExperience, outputSkills];

editButton.addEventListener('click', function () {
  editableFields.forEach(field => {
    field.contentEditable = field.isContentEditable ? 'false' : 'true';
  });
  editButton.textContent = editButton.textContent === 'Enable Editing' ? 'Disable Editing' : 'Enable Editing';
});

// PDF generation using jsPDF
downloadBtn.addEventListener('click', function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add resume content to PDF
  doc.text(`Name: ${outputName.textContent}`, 10, 10);
  doc.text(`Email: ${outputEmail.textContent}`, 10, 20);
  doc.text(`Phone: ${outputPhone.textContent}`, 10, 30);
  doc.text(`Education: ${outputEducation.textContent}`, 10, 40);
  doc.text(`Experience: ${outputExperience.textContent}`, 10, 50);
  doc.text(`Skills: ${outputSkills.textContent}`, 10, 60);

  // Save the generated PDF
  doc.save('resume.pdf');
});

// Copy to clipboard functionality
copyBtn.addEventListener('click', function () {
  const copyText = shareLink.href;
  navigator.clipboard.writeText(copyText).then(function () {
    alert('Link copied to clipboard!');
  }, function () {
    alert('Failed to copy link');
  });
});