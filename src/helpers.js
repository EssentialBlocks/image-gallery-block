/**
 * Helper Functions
 */

const validURL = (str) => {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
};

export const handleCustomURL = (customLink, id, images, setAttributes) => {
    const validUrl = customLink.length > 0 && validURL(customLink);
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return {
                ...item,
                customLink: customLink,
                isValidUrl: validUrl,
            };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};

// Inline formatting a caption may keep. Links are left out because the caption
// already sits inside the gallery item's <a>.
const CAPTION_ALLOWED_TAGS = [
    "B", "BR", "CODE", "EM", "I", "MARK", "S", "SMALL", "SPAN", "STRONG", "SUB", "SUP", "U",
];
// Removed together with their content.
const CAPTION_DROPPED_TAGS = [
    "SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "TEMPLATE", "NOSCRIPT", "TEXTAREA", "SELECT", "SVG", "MATH",
];

/**
 * Keep simple inline formatting in a caption and strip everything else,
 * including every attribute. Other tags are unwrapped so their text stays.
 */
export const sanitizeCaption = (html) => {
    if (typeof html !== "string" || html.length === 0) {
        return "";
    }

    const doc = new window.DOMParser().parseFromString(
        `<!DOCTYPE html><body>${html}</body>`,
        "text/html"
    );

    const clean = (node) => {
        Array.from(node.childNodes).forEach((child) => {
            if (child.nodeType === Node.TEXT_NODE) {
                return;
            }
            if (child.nodeType !== Node.ELEMENT_NODE) {
                child.remove();
                return;
            }

            const tag = child.tagName.toUpperCase();
            if (CAPTION_DROPPED_TAGS.includes(tag)) {
                child.remove();
                return;
            }

            clean(child);

            if (CAPTION_ALLOWED_TAGS.includes(tag)) {
                Array.from(child.attributes).forEach((attr) =>
                    child.removeAttribute(attr.name)
                );
            } else {
                child.replaceWith(...child.childNodes);
            }
        });
    };

    clean(doc.body);

    return doc.body.innerHTML;
};

export const handleOpenNewTab =(openNewTab, id, images, setAttributes) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, openNewTab: openNewTab === true ? true : false };
        }
        return item;
    });

    setAttributes({ images: updatedImageArray });
};
