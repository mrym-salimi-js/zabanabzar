export const getHeaderMeta = (pathname: string) => {
  // Static url
  const map: Record<string, { title: string; desc: string }> = {
    "/files": {
      title: "مدیریت فایل‌ها",
      desc: "فایل‌های خود را بارگذاری و مدیریت کنید",
    },
  };

  // FileId page
  if (pathname.startsWith("/files/")) {
    return {
      title: "متن فایل",
      desc: "مطالعه متن و ذخیره واژه‌ها به عنوان فلش کارت",
    };
  }
  // Edit page
  if (pathname.includes("/edit")) {
    return {
      title: "ویرایش متن",
      desc: "متن را به دلخواه ویرایش و ذخیره کنید",
    };
  }

  if (map[pathname]) return map[pathname];

  return { title: "داشبورد", desc: "یادگیری آسانتر با زبان ابزار" };
};
