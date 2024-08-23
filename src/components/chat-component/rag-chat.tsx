import { Suspense } from 'react';
import Document from "@/components/diagram-component/document";
import ChatPanel from './chat-panel';
import {getDocument} from "@/server/queries";

import {notFound } from 'next/navigation';


export default async function RagChat({doc_id} : {doc_id : string}){
    
  const file = await getDocument(doc_id);
  console.log(doc_id)
  console.log(file)
  if (!file){
    notFound();
  }
  return (
    <div className="mt-20 w-full flex">
      <ChatPanel/>
      <div className="w-1/2 h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Document file={file} />
        </Suspense>    
      </div>
    </div>
  )
}