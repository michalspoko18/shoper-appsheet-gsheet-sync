function mailMaker() {
  let signature = ``;

  GmailApp.sendEmail("examlpe@gmail.pl", "Topic", "",{cc: "", htmlBody:signature});  
}