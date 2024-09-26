$(function () {

   // Load Header
   $("#site-header").load("header.html", function () {
      console.log("Header loaded.");
   });

   const mathField = document.getElementById('math-field');

   // Handle button click to convert input to LaTeX
   document.getElementById('convert-button').addEventListener('click', function () {
      const latexCode = mathField.getValue('latex-expanded');
      document.getElementById('latex-output').value = latexCode;
   });




});
// document.ready
