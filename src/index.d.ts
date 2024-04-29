export type BufferData = Vector2 | Vector3 | CFrame | Color3 | UDim | UDim2 | number | boolean | string | buffer;
export type VariableBufferData = { [key: string]: BufferData };
export type ComputerBufferData = { [key: string]: BufferData | ComputerBufferData };

export interface ComputerBuffer {
	readonly name: string;
	GetData(): ComputerBufferData;
	Clean(): void;
	SetData(data: ComputerBufferData): void;
}
export interface Dispatcher {
	readonly numWorkers: number;
	SetVariableBuffer(data: VariableBufferData): void;
	Dispatch(numThreads: number, batchSize: number, thread: string, useSerialDispatch?: boolean): Promise<void>;
	Destroy(): void;
}

export interface ComputeLua {
	CreateDispatcher: (name: string, worker: Script | ModuleScript) => Dispatcher;
	CreateComputeBuffer: (name: string) => ComputerBuffer;
	GetComputeBufferData: (name: string) => ComputerBufferData;
	CreateThread: (
		actor: Actor,
		threadName: string,
		callback: (dispatchId: number, variableBuffer: VariableBufferData) => void,
	) => void;
}
