export const pageview = (url: string) => {
  if (process.env.NODE_ENV === "production") {
    //@ts-ignore
    window.gtag("config", process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
      page_path: url,
    });
  }
};

export const event = ({
  action,
  params,
}: {
  action: string;
  params?: Record<string, unknown>;
}) => {
  if (process.env.NODE_ENV === "production") {
    //@ts-ignore
    window.gtag("event", action, params);
  }
};
