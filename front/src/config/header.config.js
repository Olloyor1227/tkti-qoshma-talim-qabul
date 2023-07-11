import i18next from "i18next";

export const headerItems = (authenticated) => [
  {
    name: "Header.application",
    link: `${i18next.language}/application`,
  },
  {
    name: "Header.news",
    link: `${i18next.language}/news`,
  },
  {
    name: "Header.cabinet",
    link: `${i18next.language}/cabinet`,
  },
].slice(0, !authenticated ? 3 : 2);
