import { Helmet } from 'react-helmet';
import logo from '../assets/validate.webp'

export default function SEO({
    title = 'ValidaWhats - Validação de números de WhatsApp',
    description = 'Ferramenta eficiente para validar contatos de WhatsApp em massa com estatísticas e dashboard.',
    url = window.location.href, 
    keywords = 'validação WhatsApp, números WhatsApp, dashboard WhatsApp, estatísticas WhatsApp'
}) {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <meta name="theme-color" content="#ffffff" />

            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content='https://validaWhats.com/img/valida-whats.webp' />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="ValidaWhats" />
            <meta property="og:locale" content="pt_BR" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content='https://validaWhats.com/img/valida-whats.webp' />

            <link rel="canonical" href={url} />

            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" href="/icon.svg" type="image/svg+xml" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />

            <link rel="preload" href={logo} as="image" type="image/webp" />
        </Helmet>
    );
}
