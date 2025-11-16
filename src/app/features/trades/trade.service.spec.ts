import { TestBed } from '@angular/core/testing';
import { TradeService } from './trade.service';
import { Trade, TradeOrder } from '../../shared/models/trade.model';
import { Subject, take } from 'rxjs';

describe('TradeService', () => {
	let service: TradeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [TradeService],
		});

		service = TestBed.inject(TradeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('create', () => {
		it('should create a Trade from a TradeOrder', (done) => {
			const order: TradeOrder = {
				kind: 'BUY',
				planet: 'Earth',
				amount: 1234,
			} as TradeOrder;

			service.create(order).subscribe(trade => {
				expect(trade).toBeTruthy();
				expect(trade.type).toBe('BUY');
				expect(trade.planet).toBe('Earth');
				expect(trade.amount).toBe(1234);
				expect(trade.id).toContain('T');
				expect(trade.time).toBeDefined();
				done();
			});
		});
	});

	describe('emitExecuted & getExecutedSnapshot', () => {
		it('should store executed trades and emit through executed$', (done) => {
			const trade: Trade = {
				id: 'T1',
				planet: 'Mars',
				type: 'SELL',
				amount: 500,
				time: new Date().toISOString(),
			};

			const received: Trade[] = [];

			const sub = service.executed$.subscribe(t => {
				received.push(t);
				expect(t).toEqual(trade);

				const snapshot = service.getExecutedSnapshot();
				expect(snapshot.length).toBe(1);
				expect(snapshot[0]).toEqual(trade);

				sub.unsubscribe();
				done();
			});

			service.emitExecuted(trade);
		});

		it('getExecutedSnapshot should return a copy of internal array', () => {
			const trade: Trade = {
				id: 'T2',
				planet: 'Vega',
				type: 'BUY',
				amount: 999,
				time: new Date().toISOString(),
			};

			service.emitExecuted(trade);

			const snapshot1 = service.getExecutedSnapshot();
			expect(snapshot1.length).toBe(1);

			snapshot1.push({
				id: 'T3',
				planet: 'Ulthar',
				type: 'SELL',
				amount: 42,
				time: new Date().toISOString(),
			});

			const snapshot2 = service.getExecutedSnapshot();
			expect(snapshot2.length).toBe(1);
		});
	});

	describe('streamOrders', () => {
		it('should emit trades according to burstSize and stop when stop$ emits', (done) => {
			const stop$ = new Subject<void>();
			const trades: Trade[] = [];

			service.streamOrders({
				burstsPerSecond: 100,
				burstSize: 2,
				planets: ['Earth', 'Mars'],
				kindWeights: { BUY: 1, SELL: 1 },
				stop$,
			})
				.pipe(take(4))
				.subscribe({
					next: t => {
						trades.push(t);
					},
					complete: () => {
						expect(trades.length).toBe(4);
						trades.forEach(trade => {
							expect(['Earth', 'Mars']).toContain(trade.planet);
							expect(trade.amount).toBeGreaterThanOrEqual(1000);
							expect(trade.amount).toBeLessThanOrEqual(10000);
						});

						stop$.next();
						done();
					},
				});
		});
	});
});
