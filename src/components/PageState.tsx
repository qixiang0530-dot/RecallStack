import { AlertCircle, LoaderCircle } from 'lucide-react'

export function LoadingState() {
  return <div className="page-state"><LoaderCircle className="spin" size={24} /><span>正在整理学习任务</span></div>
}

export function ErrorState({ message }: { message: string }) {
  return <div className="page-state error"><AlertCircle size={24} /><span>{message}</span></div>
}
