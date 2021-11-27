import { ComponentPropsWithRef, useEffect, useState } from "react";
import styled from "styled-components";

type ImageLoaderProps = {
  src?: string;
  icon?: boolean;
} & ComponentPropsWithRef<"img">;

const ImageLoader = styled((props: ImageLoaderProps) => {
  const { src, icon = false, className = "", ...rest } = props;
  const cName = `${className} slide-down-fade-in`.trim();
  const [imgSrc, setSrc] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (src === imgSrc) return;

    setErr(false);
    setLoaded(false);
    setSrc("");

    if (!src) return;

    setLoading(true);
    const img = new Image();
    img.onerror = () => {
      setErr(true);
      setLoaded(true);
      setLoading(false);
    };
    img.onload = () => {
      setSrc(src);
      setLoaded(true);
      setLoading(false);
    };
    img.src = src;
  }, [src]);

  if (!loaded) return <span className="material-icons">image</span>;
  if (err) return <span className="material-icons">close</span>;
  if (loading) return <span className="spinner--before" />;
  if (icon) return <span className="material-icons">check_circle</span>;

  return <img className={cName} src={src} {...rest} alt={rest.alt} />;
})`
  flex-shrink: 0;
`;

export default ImageLoader;
