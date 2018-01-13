<?php include"linklokurl.php"; ?>
<html>
<head>
<title>Linklok URL form demo</title>
<script language="JavaScript">
<!-- JavaScript
function validateform(form)
{
  if (form.name.value=="")
  {
    alert("Please enter your name")
    form.name.focus()
    return (false)
  }
  if (validateemail(form.email.value)==false)
  {
    alert("Please enter a valid email address")
    form.email.focus()
    return (false)
  }
  return(true);
}

function validateemail (emailStr)
{
  var ck_email = /^([\w-\'!#$%&\*]+(?:\.[\w-\'!#$%&\*]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,9}(?:\.[a-z]{2})?)$/i
  if (!ck_email.test(emailStr))
    return(false)
  return(true)  
}

// - JavaScript - -->
</script>
</head>
<body>
<p>Before trying this demo you must set up linklokurl.php and place a file called file1.zip in the secure directory.<br>Currently 
the form will redirect to <a href="http://www.vibralogix.com">www.vibralogix.com</a> 
after submit is pressed and will send a link valid for 60<br>minutes and not 
IP address locked. You can change these settings of course.</p>
<form name="form1" action="demoform.php" method="post" onSubmit="return validateform(this)">
<p>Name <input type="text" name="name"><br><br>Email &nbsp;<input type="text" name="email"></p>
    <p><input type="submit" name="button1" value="Submit"></p>
<?php linklokemail('file1.zip',60,0,'http://www.vibralogix.com/',0); ?>
</form>
<p>&nbsp;</p>
</body>
</html>