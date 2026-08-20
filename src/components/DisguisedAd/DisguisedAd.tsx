import { useRef, useState } from "react";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import demo from "../demo/demo.module.css";
import Outcome from "../demo/Outcome";
import ResetBar from "../demo/ResetBar";
import styles from "./DisguisedAd.module.css";

type Post = {
  id: string;
  initials: string;
  name: string;
  handle: string;
  tag?: string;
  text: string;
  replies: number;
  reposts: number;
  likes: number;
  link?: { href: string; title: string; domain: string; alt?: boolean };
};

/* Three of these four are from brands. One says Ad, one says Suggested for
   you, and one carries no label at all. */
const POSTS: Post[] = [
  {
    id: "mara",
    initials: "MR",
    name: "Mara Reyes",
    handle: "@marabuilds · 2h",
    text: "four hours on a bug that turned out to be my own stale service worker. four.",
    replies: 34,
    reposts: 12,
    likes: 418,
  },
  {
    id: "kolbrenn",
    initials: "KB",
    name: "Kolbrenn",
    handle: "@kolbrenn",
    tag: "Ad",
    text: "the grinder changed more than the beans did. two years on the burr geometry.",
    replies: 8,
    reposts: 3,
    likes: 96,
    link: {
      href: "ads.plaza.so/r?cid=8842&to=kolbrenn.coffee%2Fm2&uid=a91f",
      title: "Kolbrenn M2 · $279",
      domain: "kolbrenn.coffee",
    },
  },
  {
    id: "ledger",
    initials: "TB",
    name: "The Bean Ledger",
    handle: "@beanledger · 5h",
    text: "we tested 14 grinders under $300. the results surprised us.",
    replies: 61,
    reposts: 203,
    likes: 1904,
    link: {
      href: "thebeanledger.eu/guides/grinders",
      title: "Home espresso grinders, tested",
      domain: "thebeanledger.eu",
      alt: true,
    },
  },
  {
    id: "harbour",
    initials: "HV",
    name: "Harbour Roastery",
    handle: "@harbourroast",
    tag: "Suggested for you",
    text: "our winter blend is back. same farm, same lot, third year running.",
    replies: 4,
    reposts: 1,
    likes: 27,
  },
];

function DisguisedAd() {
  const [engaged, setEngaged] = useState<Record<string, boolean>>({});
  const [opening, setOpening] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const feed = useRef<HTMLDivElement>(null);

  function engage(key: string) {
    setTouched(true);
    setEngaged((current) => ({ ...current, [key]: !current[key] }));
  }

  function reset() {
    setEngaged({});
    setOpening(null);
    setTouched(false);
    if (feed.current) feed.current.scrollTop = 0;
  }

  return (
    <>
      <div className={`${demo.demo} ${styles.feed}`}>
        <div className={styles.tabs}>
          <span className={styles.tabOn}>For you</span>
          <span>Following</span>
        </div>

        <div ref={feed} className={styles.scroll}>
          {POSTS.map((post) => {
            const reposted = engaged[`${post.id}-repost`] ?? false;
            const liked = engaged[`${post.id}-like`] ?? false;

            return (
              <div key={post.id} className={styles.post}>
                <span className={styles.avatar}>{post.initials}</span>
                <div>
                  <p className={styles.postHead}>
                    <b>{post.name}</b>
                    <span>{post.handle}</span>
                  </p>
                  {/* "Ad" sits exactly where the timestamp goes on every other
                      post: same size, same grey. It reads as metadata. */}
                  {post.tag && <p className={styles.tag}>{post.tag}</p>}
                  <p className={styles.text}>{post.text}</p>

                  {post.link && (
                    <button
                      type="button"
                      className={styles.preview}
                      onClick={() => {
                        setTouched(true);
                        setOpening(post.link?.href ?? null);
                      }}
                    >
                      <span
                        className={
                          post.link.alt ? `${styles.previewImg} ${styles.alt}` : styles.previewImg
                        }
                      />
                      <span className={styles.previewMeta}>
                        <b>{post.link.title}</b>
                        <span>{post.link.domain}</span>
                      </span>
                    </button>
                  )}

                  <div className={styles.actions}>
                    <span className={styles.action}>
                      <MessageCircle size={14} />
                      <span>{post.replies}</span>
                    </span>
                    <button
                      type="button"
                      className={reposted ? `${styles.action} ${styles.actionOn}` : styles.action}
                      onClick={() => engage(`${post.id}-repost`)}
                    >
                      <Repeat2 size={14} />
                      <span>{post.reposts + (reposted ? 1 : 0)}</span>
                    </button>
                    <button
                      type="button"
                      className={liked ? `${styles.action} ${styles.actionOn}` : styles.action}
                      onClick={() => engage(`${post.id}-like`)}
                    >
                      <Heart size={14} />
                      <span>{post.likes + (liked ? 1 : 0)}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {opening && (
          <Outcome>
            Opening <code>{opening}</code>
          </Outcome>
        )}
      </div>

      <ResetBar show={touched} onReset={reset} />
    </>
  );
}

export default DisguisedAd;
