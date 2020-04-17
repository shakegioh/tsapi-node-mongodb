# DTOs

Aqui ficam interfaces para os inputs que vem do req.body

Tem que usar a função `ensureDto<TypescriptSchema>(JoiDto, obj)`.

Caso seja um array de Dtos, use assim `ensureDtoArray<TypescriptSchema>(JoiDto, obj)`.

### Exemplo objeto

```javascript
const rawObject = { name: "Giovanne" };

let payloadGarantido: NameSchema;

try {
  payloadGarantido = ensureDto<NameSchema>(NameDto, rawObject)
} catch(error) {
  // Tratar erro
}

// Continuar lógica
```

## Exemplo array de objetos

```javascript
const rawArray = [
  { name: "John Doe" },
  { name: "Shorenai Shuriey" }
];

let payloadGarantido: NameSchema[] = [];

try {
  payloadGarantido = ensureDtoArray<NameSchema>(NameDto, rawArray);
} catch(error) {
  // Tratar erro
}

// Continuar lógica
```
