
export interface LandingPageData {
  brand: {
    name: string;
    tagline: string;
    description: string;
  };
  navigation: {
    links: Array<{
      label: string;
      destination: string;
    }>;
  };
  hero: {
    badge: {
      text: string;
      icon: string;
    };
    title: string;
    highlightedWord: string;
    description: string;
    buttons: Array<{
      label: string;
      destination: string;
      icon: string | null;
    }>;
    socialProof: {
      userImages: string[];
      trustCount: string;
      trustText: string;
    };
    featuredImage: {
      url: string;
      alt: string;
      featuredBadge: {
        label: string;
        title: string;
      };
    };
  };
  features: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  socialProof: {
    sectionTitle: string;
    sectionDescription: string;
    images: string[];
  };
  cta: {
    title: string;
    description: string;
    buttons: Array<{
      label: string;
      destination?: string;
      variant?: string;
      icon?: string;
    }>;
  };
  footer: {
    description: string;
    socialLinks: string[];
    shopLinks: Array<{
      label: string;
      destination: string | null;
    }>;
    companyLinks: Array<{
      label: string;
      destination: string | null;
    }>;
    newsletter: {
      title: string;
      description: string;
      placeholder: string;
    };
    copyright: string;
    legalLinks: Array<{
      label: string;
      destination: string | null;
    }>;
  };
}

declare module "*/landingPageData.json" {
  const value: LandingPageData;
  export default value;
}