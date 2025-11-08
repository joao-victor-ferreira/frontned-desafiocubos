import { createContext, useContext, useState, ReactNode } from 'react';

type TipoMensagem = 'sucesso' | 'erro' | '';

interface ToastMessage {
  id: string;
  tipo: TipoMensagem;
  texto: string;
}

interface ToastContextData {
  mensagens: ToastMessage[];
  showToast: (texto: string, tipo: TipoMensagem) => void;
}

const ToastContext = createContext<ToastContextData | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [mensagens, setMensagens] = useState<ToastMessage[]>([]);

  const showToast = (texto: string, tipo: TipoMensagem) => {
    const id = crypto.randomUUID();
    const novaMensagem = { id, texto, tipo };
    setMensagens(prev => [...prev, novaMensagem]);

    setTimeout(() => {
      setMensagens(prev => prev.filter(msg => msg.id !== id));
    }, 4000); // desaparece depois de 4s
  };

  return <ToastContext.Provider value={{ mensagens, showToast }}>{children}</ToastContext.Provider>;
};

export const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de um ToastProvider');
  }
  return context;
};
