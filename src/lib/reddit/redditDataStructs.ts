export const genCommentTrees = (comments: any) => {
    const lastDepths: Record<number, any> = {};
    const commentsTrees: any[] = [];

    comments.forEach((comment: any) => {
        const parent = lastDepths[comment["data"]["depth"] - 1];
        if (!parent) commentsTrees.push(comment);
        else if (!parent["data"]["replies"]) {
            parent["data"]["replies"] = {
                kind: "Listing",
                data: {
                    after: null,
                    before: null,
                    children: [comment],
                    dist: null,
                    geo_filter: "",
                    modhash: null,
                },
            };
        } else {
            parent["data"]["replies"]["data"]["children"].push(comment);
        }
        lastDepths[comment["data"]["depth"]] = comment;
    });

    return commentsTrees;
};
