$(function () {

   // Load Header and footer ----------------------------------------------------------
   $("#site-header").load("header.html", function () 
   {
      console.log("Header loaded.");
   });

   $("#site-footer").load("footer.html", function () 
   {
      console.log("Footer loaded.");
      // Add the current year to copyright
      const thisYear = new Date().getFullYear();
      $("#footer-year").text(thisYear);

   });

   // Reset form button -----------------------------------------------------------------
   $("#dialog-confirm").dialog(
   {
      autoOpen: false,
      resizable: false,
      height: "auto",
      width: 400,
      modal: true,
      buttons: {
         "Cancel": function () {
            $(this).dialog("close");
         },
         "Reset": function () {
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

   // Reset button ----------------------------------------------------------------------
   $('#reset-form').on("click", function () 
   {

      // Open the dialog box onClick
      $("#dialog-confirm").dialog("open");

      // remove the close button on the modal
      $(".ui-dialog-titlebar-close").remove();
      $(".ui-icon-alert").remove();
      $(".ui-dialog-buttonset button:first-of-type").addClass("btn btn-default bg-light");
      $(".ui-dialog-buttonset button:last-of-type").addClass("btn btn-primary");
   });

   // Zeno Rocha's copy utility ------------------------------------------------------------
   new ClipboardJS('.copy-btn', 
   {
      target: function (trigger) 
      {
         return trigger.nextElementSibling;
      }
   });

   // mathLive functions --------------------------------------------------------------------
   const mathInput = document.getElementById('math-input');
   const latexOutput = document.getElementById('latex-output');
   const jsOutput = document.getElementById('js-output');

   // Update textarea whenever the mathfield content changes
   $('#math-input').on('input change', function () 
   {
      const latex = mathInput.getValue();
      latexOutput.value = latex;

      jsOutput.value = convertLatexToJs(latex);

   });

   // Convert LaTeX markdown to JS -----------------------------------------------------------
   function convertLatexToJs(theLatex) 
   {
      // Log the input for debugging
      console.log("Original LaTeX:", theLatex);


      // run original LaTeX through basic recursive replacements
      let jsExpression = theLatex;
      jsExpression = fractionParser(jsExpression);
      jsExpression = matrixParser(jsExpression);

      // Run original LaTeX through basic, non-recursive replacements
      jsExpression = jsExpression

         // Properly format SIMPLE fractions
         .replace(/\\frac(\d)(\d)/g, '(($1)/($2))')

         // Replace ^ for exponents with ** (e.g., x^2 to x**2)
         .replace(/\^/g, '**')

         // Replace \sqrt{x} with Math.sqrt(x)
         .replace(/\\sqrt{([^{}]+)}/g, 'Math.sqrt($1)')

         // Replace Greek symbols, e.g., \alpha to α (Unicode for alpha)
         .replace(/\\alpha/g, 'α')
         .replace(/\\beta/g, 'β')
         .replace(/\\gamma/g, 'γ')
         // Add more Greek symbols as needed

         // Replace common LaTeX functions with JavaScript equivalents
         .replace(/\\sin/g, 'Math.sin')
         .replace(/\\cos/g, 'Math.cos')
         .replace(/\\tan/g, 'Math.tan')
         .replace(/\\log/g, 'Math.log')

         // Convert LaTeX multiplication to Javascript multiplication
         .replace(/\\cdot/g, '*')

         // Convert LaTeX parentheses to Javascript parentheses
         .replace(/\\left\(/g, '(')
         .replace(/\\right\)/g, ')');

      // Log the output JS expression for debugging
      console.log("update 1-12-25 4:14PM");
      console.log("Converted JS Expression:", jsExpression);

      return jsExpression;
   }

   // sends COMPLEX fraction specifications to recursive parser
   function fractionParser(fracstring)
   {
      // this regex gets smaller fraction pieces in the form of \frac{x}{y}
      // allows recursive conversion, ensures no accidental conversions of other operators
      var regex = /\\frac\{([^\{\}]*)\}\{([^\{\}]*)\}/g;
      // lets us pass replacements necessary without dumb callbacks
      var replacementArray = 
      [
         [/\\frac{/g,'('], 
         [/}{/g,')/('],
         [/}/g,')'] // all these parentheses ensure expressions properly contained
      ];
      return recursiveParser(fracstring, regex, replacementArray);
   }

   // sends matrix specifications to recursive parser
   function matrixParser(matstring)
   {
      // this regex isolates individual matrices
      // allows recursive conversion, ensures no accidental conversions of other operators
      var regex = /\\begin\{pmatrix\}([^(?:end)]*)(\\end\{pmatrix\})/g;
      // lets us pass replacements necessary without dumb callbacks
      var replacementArray = 
      [
         [/\\begin{pmatrix}/g, 'Math.matrix([['],
         [/\\end{pmatrix}/g, ']])'],
         [/&/g, ','],
         [/\\\\/g, '],[']
      ];
      return recursiveParser(matstring, regex, replacementArray);
   }

   // Conversion functions, will eventually organize better
   function recursiveParser(instring, regex, replacementArray)
   {
      let found = instring.match(regex); // returns array of matches. null if no matches
      console.log(instring);
      // if matches found, commence replacement
      if(found != null)
      {
         for(match of found)
         {
               let temp = match;
               console.log(temp);
               for(var i in replacementArray)
               {
                  let pattern = replacementArray[i];
                  console.log(pattern);
                  temp = temp.replace(pattern[0],pattern[1]);
                  console.log(temp);
               }
               instring = instring.replace(match,`(${temp})`); 
         }
         return recursiveParser(instring, regex, replacementArray);
      }
      // if no matches, recursion ends
      return instring;
   }

   // Create the QR code from the formula -------------------------------------------------------
   $("#qr-create").on("click", function () 
   {
      // concatenate the equation
      // using '=' as delim
      let theEquation = ($("#js-output").val()).split('=');
      // account for no '=' just in case? you never know
      let left = encodeURIComponent(theEquation[0]);
      let right = 0
      if(theEquation.length > 1)
      {
         right = encodeURIComponent(theEquation[1]);
      }
      let eightWallUrl = "https://ndlearning.8thwall.app/ar-math-viewer?left=" + left + "&right=" + right;

      // Clear any previous qr code
      $("#qr-code").empty("");

      // Generate and write new QR code
      new QRCode(document.querySelector("#qr-code"), {
         text: eightWallUrl,
         width: 256,
         height: 256,
         colorDark: "#000000",
         colorLight: "#ffffff",
         correctLevel: QRCode.CorrectLevel.L
      });

      // Write the image to the modal
      $(".modal").find(".modal-body > p").text(`${left} = ${right}`);
      $(".modal").find(".modal-title").text("QR Code");

      // Display the modal
      $('#gallery-modal').modal('show');

   });



   // Adding a hover effect to the cards --------------------------------------------------------
   $('.card').on('hover', function () 
   {
      $(this).addClass("shadow-sm"); // Mouse enters
   });


   // Clear the selection -----------------------------------------------------------------------
   function clearSelection() 
   {
      if (window.getSelection) 
      {
         // Modern browsers
         window.getSelection().removeAllRanges();
      } 
      else if (document.selection) 
      {
         // Older versions of IE
         document.selection.empty();
      }
   }

   $(".copy-btn").on("click", function () 
   {
      clearSelection();
   });


   // Show the QR code for each card button --------------------------------------------------------
   $(".modal-btn").on("click", function () 
   {

      // Clear any previous qr code
      $("#qr-code").empty("");

      // Get the image, title, and description for each card
      const projectQrCode = $(this).data("qr-code-image");
      const projectDescription = $(this).parent().parent().find(".card-text").text();
      const projectTitle = $(this).parent().parent().find(".card-title").text();

      // Write the image to the modal
      $(".modal").find(".modal-body > p").text(projectDescription);
      $(".modal").find(".modal-title").text(projectTitle);

      // Display the modal
      $('#gallery-modal').modal('show');

   });

});
// document.ready
