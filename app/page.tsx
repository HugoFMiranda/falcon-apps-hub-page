import PortfolioLandingPage from "@/components/shadcn-space/pages/landing-page-01";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, education, person, skills } from "@/lib/profile";

const ids = {
  website: `${SITE_URL}/#website`,
  profile: `${SITE_URL}/#profile`,
  person: `${SITE_URL}/#person`,
};

// ProfilePage + Person is the structure Google documents for personal pages;
// it is what ties searches for the name to this site.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": ids.website,
      url: SITE_URL,
      name: person.name,
      description: SITE_DESCRIPTION,
      inLanguage: "en",
      publisher: { "@id": ids.person },
    },
    {
      "@type": "ProfilePage",
      "@id": ids.profile,
      url: SITE_URL,
      name: SITE_TITLE,
      inLanguage: "en",
      isPartOf: { "@id": ids.website },
      mainEntity: { "@id": ids.person },
    },
    {
      "@type": "Person",
      "@id": ids.person,
      name: person.name,
      url: SITE_URL,
      image: person.avatar,
      jobTitle: person.jobTitle,
      description: SITE_DESCRIPTION,
      worksFor: { "@type": "Organization", name: person.employer },
      address: {
        "@type": "PostalAddress",
        addressLocality: person.city,
        addressCountry: person.countryCode,
      },
      alumniOf: [...new Set(education.map((edu) => edu.school))].map((name) => ({
        "@type": "EducationalOrganization",
        name,
      })),
      knowsAbout: skills,
      sameAs: [person.github],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so no string in the data can close the script tag early.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PortfolioLandingPage />
    </>
  );
}
