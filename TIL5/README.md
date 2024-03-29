# 오늘의 목표는? 그래프!
- 챕터8. p.350 ~ 406

## 후반부 시작
- 벨만포드, 플로이드워셜, MST까지!

### 벨만-포드 알고리즘
- 벨만-포드(bellman-form-moore) 알고리즘은 그래프에서 최단 거리를 구하는 알고리즘이다.
- 다음과 같은 특징을 가지고 있다.
    - 기능:
        - 특정 출발 정점에서 다른 모든 정점까지의 최단 경로 탐색
    - 특징:
        - 음수 가중치 간선이 있어도 수행할 수 있다.
        - 전체 그래프에서 음수 사이클의 존재 여부를 판단할 수 있다.
    - 시간복잡도: O(VE) 단, V는 정점의 개수, E는 간선의 개수

- 벨만-포드 알고리즘은 간선을 중심으로 동작하는 최단 거리 알고리즘이다.
- 한 정점을 대상으로 최단 거리를 구하지만 다익스트라가 더 빠르므로(VlogE) 보통 음수 사이클 여부 판별에 쓰인다.
- 정점으로부터 얼만큼 이동(이동횟수)했는지에 따른 최단 경로를 지칭한다.

- 벨만-포드 알고리즘은 다음 3가지 단계의 원리로 동작한다.
1. 간선 리스트로 그래프를 구현하고 최단 경로 배열 초기화하기
- 최단 경로 배열은 크기가 V인 1차원 리스트이며, 시작 정점은 0, 나머지는 inf로 초기화한다.

2. 모든 간선을 확인해 정답 배열 업데이트하기
- 최단 경로 배열에서 업데이트 반복 횟수는 V - 1이다.
- 이는 음수 사이클이 없을 때 특정 두 노드의 최단 거리를 구성할 수 있는 간선의 최대 개수는 V - 1이기 때문이다.
- 간선 E = (s,e,w)(start, end, weight)에서 다음 조건을 만족하면 업데이트를 진행한다.
- if (D[s] != inf && D[e] > D[s] + w), then D[e] = D[s] + w 
- 업데이트 반복 횟수가 K번이라면 해당 시점에 정답 배열의 값은 시작점에서 K 개의 간선을 거쳤을 때 각 정점에 대한 최단 경로이다.

3. 음수 사이클 유무 확인하기
- 만약, V - 1회 이후 한 번 더 검사해서 업데이트가 진행된다면 음수 사이클이 있다고 판단한다.
- 이 경우, 최단 경로를 찾을 수 없는 그래프이며 2단계에서 찾은 정답 배열은 무의미해진다.
- 음수 사이클이 존재하면 사이클이 돌수록 가중치가 감소하므로 최단 경로를 구할 수 없다.

### 플로이드-워셜 알고리즘
- 플로이드-워셜(floyd-warshall) 알고리즘은 마찬가지로 그래프에서 최단 경로를 구하는 알고리즘이나, 다음과 같은 특징을 가진다.
    - 기능
        - 모든 노드 간에 최단 경로 탐색
    - 특징
        - 음수 가중치 간선이 있어도 수행할 수 있음
        - 동적 계획법의 원리를 이용해 알고리즘에 접근
    - 시간복잡도: O(V^3)

- 플로이드-워셜 알고리즘을 도출하는 가장 핵심적인 원리는 시작 정점 S와 도착 정점 E 사이의 정점 K에 대하여,
- 만약 S->E인 최단 경로 R 안에 K가 있다면,
- S->K와 K->E는 모두 최단 경로 R의 부분 경로 R'일 수밖에 없다는 점이다.
- 따라서 그래프의 형상을 보고 최단 경로를 부분 최단 경로를 포함하는 형태로 만들 수 있으므로 동적 계획법을 적용할 수 있다.
- 즉, 점화식으로 표현하면 D[S][E] = min(D[S][E], D[S][K] + D[K][E])

## 백준 연습문제

- P11657 타임머신으로 빨리 가기(bellman-ford)
- P11404 가장 빠른 버스 노선 구하기(floyd-warshall)
- P1197  최소 신장 트리 구하기(minimum-spanning-tree)