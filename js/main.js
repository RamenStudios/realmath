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

   // Reset button
   $("#reset-form").on("click", function () {
      // Open the dialog box onClick
      $("#dialog-confirm").dialog("open");
   });


   // Reset form button
   $("#dialog-confirm").dialog({
      autoOpen: false,
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
         "Cancel": function () {
            $(this).dialog("close");
         },
         "Reset Page": function () {
            // Turns the green checked circles to open empty circles
            window.location.reload(true);
            //
            // // Stop propagation of the event
            // event.stopPropagation();
            // // Close the dialog
            // $("#dialog-confirm").dialog("close");
         }
      }
   });



});
// document.ready
