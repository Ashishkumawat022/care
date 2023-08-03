export const logoutAdmin = () => {
  const removeItems = [
    "care_admin_token",
    "userData",
    "carehomeId",
    "carefacility",
    "companyName",
    "carehomeName",
  ];

  removeItems.map((item) => {
    localStorage.removeItem(`${item}`);
  });
};
