function main() {
  importCSVFromURL(); // nie moja funkcja - pobiera z ftp plik csv i wstawia w kolumny gsheet

  Utilities.sleep(15000);

  bulkList();

  mailMaker();
}
