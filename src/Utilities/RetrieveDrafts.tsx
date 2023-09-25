import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { DraftModel } from "../redux/articles/model";

export const RetrieveDrafts = async (uid: any) => {
  const draftSnapShot = await getDocs(
    collection(db, "articles", uid, "drafts")
  );
  let userDrafts: any = [];
  if (draftSnapShot) {
    draftSnapShot.forEach((doc) => {
      userDrafts.push({ id: doc.id, data: doc.data() });
    });
  }
  return userDrafts;
};

export const RetrieveSingleDraft = async (uid: any, draftId: string) => {
  const draftSnapShot = await getDocs(
    collection(db, "articles", uid, "drafts")
  );
  let singleDraft: DraftModel["drafts"] = [
    {
      id: "",
      data: [
        {
          text: "",
          title: "",
          subtitle: "",
          html: "",
          authorEmail: "",
          authorName: "",
          timeCreated: new Date().toLocaleTimeString(),
          dateCreated: new Date().toLocaleDateString(),
          likes: 0,
          comments: {
            numberOfComments: 0,
            text: [],
          },
          categories: [],
          repost: 0,
          readOnly: true,
          coverImage: "",
          published: false,
          profileImageUrl: "",
        },
      ],
    },
  ];
  if (draftSnapShot) {
    draftSnapShot.forEach((doc) => {
      if (doc.id === draftId) {
        singleDraft.push({ id: doc.id, data: doc.data() as DraftModel["drafts"][0]["data"] });
      }
    });
  }
  return singleDraft;
};
