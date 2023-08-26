export default function change_case(text, number_of_word = false) {
  let str = text.split("_");
  if (number_of_word) {
    str = text.split("_", number_of_word);
  }

  str = str
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .toLocaleString()
    .replace(",", " ");
  return str;
}
