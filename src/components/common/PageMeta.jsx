import { Helmet } from "react-helmet-async";

const PageMeta = ({
  title,
  description = "TuitionFlow — Manage students, track tuition, and stay organized.",
}) => {
  const fullTitle = title === "TuitionFlow" ? title : `${title} | TuitionFlow`;

  return (
    <Helmet>
      <title>{fullTitle}</title>

      <meta name="description" content={description} />
    </Helmet>
  );
};

export default PageMeta;
