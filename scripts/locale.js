const langs = {};

langs.english = {
  loading: "Loading...",
  errorOutOfDate: "Client out of date",
  errorDescOutOfDate: "Your client is out of date, please force refresh the page and/or use\npartyblitz.xyz",
  errorDisabled: "Opened in another tab",
  errorDescDisabled: "The game has been opened in another tab, please continue playing\nthere",
  errorFailedReconnect: "Connection lost",
  errorDescFailedReconnect: "The client failed to connect to the server after multiple attempts,\nplease try again later",
  play: "Play"
};

langs.polish = {
  loading: "Ładowanie...",
  errorOutOfDate: "Nieaktualny klient",
  errorDescOutOfDate: "Twój klient jest nieaktualny, wymuś odświeżenie strony i korzystaj\nz partyblitz.xyz",
  errorDisabled: "Otwarto w innej zakładce",
  errorDescDisabled: "Gra została otworzona w innej zakładce, prosimy tam kontynuować\nrozgrywkę",
  errorFailedReconnect: "Stracono połączenie",
  errorDescFailedReconnect: "Klient nie mógł połączyć się z serwerem po wielu próbach, prosimy\nspróbować później",
  play: "Graj"
};

var locale = {};

if (navigator.language.startsWith("pl")) {
  locale = langs.polish;
} else {
  locale = langs.english;
}
