import logos from "../images/emails";
export default function getEmailProvider(email) {
  //   console.log(logos);
  // Check email validity using regular expression
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    let [, provider] = email.split("@");
    provider = provider.split(".")[0];

    // Return email provider information
    return {
      provider: provider.replace(provider[0], provider[0].toUpperCase()),
      src: logos[provider] || logos.def,
      valid: true,
    };
  } else {
    return {
      provider: "Invalid Email",
      src: logos.def,
      vaild: false,
    };
  }
}
