const opentelemetry = require('@opentelemetry/api')
const { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor } = require('@opentelemetry/tracing')
const { CollectorTraceExporter } = require('@opentelemetry/exporter-collector')

const exporter0 = new CollectorTraceExporter({
  serviceName: 'basic-service',
  url: 'http://localhost:55681/v1/trace'
})

const exporter1 = new CollectorTraceExporter({
  serviceName: 'basic-service',
  url: 'http://localhost:55682/v1/trace'
})

const provider = new BasicTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(exporter0))
provider.addSpanProcessor(new SimpleSpanProcessor(exporter1))
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
provider.register()

const tracer = opentelemetry.trace.getTracer('example-collector-exporter-node')

const parentSpan = tracer.startSpan('main')
parentSpan.setAttribute('key', 'val')
parentSpan.addEvent('lulz')
const childSpan = tracer.startSpan('child', { parent: parentSpan })
childSpan.end()
parentSpan.end()
