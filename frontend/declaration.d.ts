declare module "@sanity/block-content-to-react" {
  import * as React from "react";

  interface BlockContentProps {
    blocks: any;
    className?: string;
    renderContainerOnSingleChild?: boolean;
    serializers?: {
      types?: {
        [key: string]: (props: any) => React.ReactNode;
      };
      marks?: {
        [key: string]: (props: any) => React.ReactNode;
      };
      list?: (props: any) => React.ReactNode;
      listItem?: (props: any) => React.ReactNode;
    };
    imageOptions?: any;
    projectId?: string;
    dataset?: string;
  }

  export default class BlockContent extends React.Component<BlockContentProps> {}
}
